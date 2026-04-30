# aws-user-group-cloud-del-norte-logo-in-3d

interactive 3d cloud del norte aws user group lone-star logo. shipped as a `<cdn-star-logo>` web component backed by a procedural babylon.js scene — a 5-pointed extruded star surrounded by a ring of 12 emissive bulb spheres, each with its own point light, glow layer, and staggered breathing pulse.

## demo

```bash
npm install
npm run dev
# opens http://localhost:5180/examples/embed.html
```

## usage

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@chasko-labs/cdn-star-logo-3d/dist/cdn-star-logo.es.js"></script>

<cdn-star-logo></cdn-star-logo>
<cdn-star-logo transparent></cdn-star-logo>
<cdn-star-logo no-rotate style="width:240px;height:240px;"></cdn-star-logo>
```

attributes:

- `transparent` — render with alpha background instead of brand navy
- `no-rotate` — disable idle y-axis rotation

the component sizes to its host element. set `width`/`height` on the element or its parent.

## programmatic api

```ts
import { StarScene } from "@chasko-labs/cdn-star-logo-3d";

const canvas = document.querySelector("canvas");
const scene = new StarScene(canvas, {
  autoRotate: true,
  bulbCount: 12,
  transparentBackground: false,
});

// access individual bulb meshes for custom animations
scene.bulbs[0].position.x += 0.1;

// dispose
scene.dispose();
```

## scene composition

| layer       | what                                                   |
| ----------- | ------------------------------------------------------ |
| star body   | procedural extruded 5-point polygon, 0.18 depth        |
| material    | pbr — purple albedo, mild metallic, slight emissive    |
| bulb ring   | 12 sphere primitives, 0.16 diameter, radius 1.32       |
| bulb mat    | pbr — violet albedo + emissive intensity 2.4 (additive)|
| point lights| 12 — one per bulb, range 1.4, intensity 0.45           |
| glow layer  | bulb-only via `referenceMeshToUseItsOwnMaterial(star)` |
| animation   | staggered scale pulse 60-frame cycle, sine ease in/out |
| rotation    | star y-axis 0.003 rad/frame, bulb ring counter-rotates |

## tech

- babylon.js core 7.x
- typescript 5.6 strict
- vite 6
- web component (autonomous custom element with shadow dom)

## backlog

see [BACKLOG.md](./BACKLOG.md) for v2 work — blender-authored asset path with hand-crafted star geometry, ktx2 textures, baked ao, volumetric light scattering.

## license

MIT-0
