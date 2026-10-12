import sys
import numpy as np

# Pulls the footage's teal and cyan (about 150 to 240 degrees) toward the site's indigo, 240 degrees, and
# calms their saturation. Hues outside the band, like the traffic-light green, stay put, and the app's own
# indigos already sit near 240, so the UI shots barely move.
TARGET, PULL, DESAT, N = 240.0, 0.9, 0.38, 33

def smooth(x):
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)

def grade(rgb):
    mx, mn = rgb.max(-1), rgb.min(-1)
    d = mx - mn
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    safe = np.where(d == 0, 1, d)
    h = np.select([mx == r, mx == g], [((g - b) / safe) % 6, (b - r) / safe + 2], (r - g) / safe + 4) * 60
    h = np.where(d == 0, 0, h)
    s = np.where(mx == 0, 0, d / np.where(mx == 0, 1, mx))
    w = smooth((h - 150) / 25) * smooth((240 - h) / 22)
    h2 = (h + w * PULL * (TARGET - h)) % 360
    s2 = s * (1 - DESAT * w)
    c = mx * s2
    x = c * (1 - np.abs((h2 / 60) % 2 - 1))
    m = mx - c
    k = (h2 // 60).astype(int) % 6
    z = np.zeros_like(c)
    out = np.select(
        [k[..., None] == i for i in range(6)],
        [np.stack(t, -1) for t in [(c, x, z), (x, c, z), (z, c, x), (z, x, c), (x, z, c), (c, z, x)]],
    )
    return out + m[..., None]

v = np.linspace(0, 1, N)
b, g, r = np.meshgrid(v, v, v, indexing='ij')  # .cube order: red changes fastest
rows = grade(np.stack([r, g, b], -1)).reshape(-1, 3)
with open(sys.argv[1], 'w') as f:
    f.write(f'TITLE "session-deck-site"\nLUT_3D_SIZE {N}\n')
    f.writelines(f'{p[0]:.6f} {p[1]:.6f} {p[2]:.6f}\n' for p in rows)
