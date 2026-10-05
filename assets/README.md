# Original character masters

The master files retain the exact bytes from the baseline portfolio commit. Do not redraw, regenerate, trace, or overwrite them.

| File | Dimensions | SHA-256 |
| --- | --- | --- |
| `masters/character-full.png` | 1024×1536 | `f0955a741500bf436c02d61d996e624f9b4db5df8ff97b3a9d1451b903920205` |
| `masters/character-head.jpeg` | 1254×1254 | `4307175ba5fcb941b28f433f13c6489a13ad31d2abb81c03561ca72c662323fb` |

The hero imports its PNG master directly so Vite emits a fingerprinted runtime copy. A tested lossless WebP was larger (439,778 vs 149,212 bytes), so it was rejected. No additional hero formats are needed.

The portrait derivative at `src/assets/character-head.webp` is 320×320, suitable for the existing maximum 160px display at 2× density. It is 42,654 bytes compared with the 74,739-byte JPEG master. Resizing uses Pillow LANCZOS in RGB, followed by WebP lossless encoding (method 6). The decoded derivative matches the resized reference pixels exactly; no drawing or character-identity edits occur.

Optional regeneration, with Python and Pillow installed:

```python
from PIL import Image

image = Image.open('assets/masters/character-head.jpeg').convert('RGB')
image = image.resize((320, 320), Image.Resampling.LANCZOS)
image.save('src/assets/character-head.webp', 'WEBP', lossless=True, method=6)
```

CSS retains the existing multiply blend and portrait clipping used to integrate the original backgrounds. Only imported assets enter `dist`; the full-resolution portrait master stays out of the deployment package.
