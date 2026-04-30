# backlog

## v2 — blender-authored hero asset

today's v1 ships a fully procedural scene. v2 replaces the runtime-generated star with a hand-crafted glb baked in blender for higher visual fidelity, then keeps the same `<cdn-star-logo>` api wrapping it.

### v2 / blender pipeline (work for bryan)

- [ ] **author star geometry in blender**
  - import current `awsug-cloud-del-norte-el-paso-star-v2-transparent.png` reference
  - extrude 5-point lone star with hand-tuned bevels on each arm (sharper outer points, softer inner valleys)
  - add inner geometric structure visible in the original artwork (sparkle rays, central ring)
  - depth: 15-25mm scaled, bevel: 2-3mm with auto-smooth normals
- [ ] **bulb ring as separate mesh nodes**
  - 12 uv-spheres, 8mm diameter, named `bulb_0` … `bulb_11`
  - positioned via array modifier on a circle empty
  - keep each bulb as its own mesh node so the existing typescript api can still target by name (`scene.getMeshByName('bulb_0')`)
- [ ] **materials**
  - star body: principled bsdf — purple albedo `#5A1F8A`, metallic 0.4, roughness 0.3, emission `#5A1F8A` strength 0.3
  - bulbs: emission shader `#A064F9` strength 4-6 (HDR for bloom)
  - inner sparkle: matte white emission strength 1.5
- [ ] **bake ambient occlusion** to a 1024x1024 texture, ktx2-compress, attach as ao map
- [ ] **export glb**
  - khr_materials_emissive_strength: required
  - khr_materials_unlit: optional for inner sparkle layer
  - draco mesh compression: optional, only if asset >300kb uncompressed
  - target: <200kb final glb
- [ ] **integrate into starscene.ts**
  - swap procedural `makeStar()` + `makeBulbRing()` for `SceneLoader.LoadAssetContainerAsync('logo-star-3d.glb')`
  - keep procedural fallback for low-end gpus or load failures
  - resolve `mesh.bulbs` from glb node names

### v2 / lighting upgrades

- [ ] **clustered lighting** enabled (babylon 9.0+ feature) — lets us scale bulb count without per-light cost spikes
- [ ] **volumetric light scattering** post-pass — the look bryan referenced in the babylon playground (areaLights=1&volumetricLight=1&clusteredLights=1)
- [ ] **soft point-light shadows** — bulb shadows on the star body for depth
- [ ] **ssao2 post-pass** — small enough for embeddable budget?
- [ ] **default rendering pipeline** — bloom, fxaa, color grading (cool-shadow / warm-highlight)

### v2 / interactivity

- [ ] **action manager on each bulb** — `OnPointerOverTrigger` boosts that bulb's pulse for 1s
- [ ] **observable on scene loaded** — emit `cdn-star-logo:ready` custom event for host page choreography
- [ ] **coroutine-driven entrance** — bulbs fade in sequentially over 1.5s on first paint
- [ ] **audio reactivity hook** — optional `audio-element` attribute pointing to a media element; bulb pulse modulates with frequency bin amplitude (parallels the `cloud-del-norte-website` background-viz audio bridge)

### v2 / build + ship

- [ ] **publish to npm** as `@chasko-labs/cdn-star-logo-3d`
- [ ] **jsdelivr cdn link** confirmed and listed in readme
- [ ] **bundle size ceiling** — 250kb gzipped including babylon core (use `@babylonjs/core` tree-shaking, not `babylonjs` package)
- [ ] **lighthouse pass** — target 90+ performance on m5a.large mobile emulation
- [ ] **integration pr in cloud-del-norte-website** — replace nav `<img src="/brand/logo.svg">` with `<cdn-star-logo>`, keep svg as `<noscript>` fallback

### v2 / docs + community

- [ ] **storybook or playground page** with sliders for bulb count, pulse rate, color
- [ ] **other aws user groups can fork** — generic `<cdn-star-logo>` → `<aws-ug-logo brand-color>` parameterization
