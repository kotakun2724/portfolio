import {
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  DirectionalLight,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  OctahedronGeometry,
  OrthographicCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
  ACESFilmicToneMapping,
  SRGBColorSpace,
  PCFShadowMap,
  DoubleSide,
  type Material,
} from "three";

/** A small, self-contained scene. All content/navigation remains server-rendered. */
export function initDungeon(root: HTMLElement) {
  const host = root.querySelector<HTMLElement>("[data-scene-host]")!;
  const labels = root.querySelector<HTMLElement>("[data-crystal-labels]")!;
  const buttons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-crystal]"),
  ];
  const status = root.querySelector<HTMLElement>("[data-quest-status]")!;
  const resetButton =
    root.querySelector<HTMLButtonElement>("[data-scene-reset]")!;
  const pauseButton =
    root.querySelector<HTMLButtonElement>("[data-scene-pause]")!;
  const help = root.querySelector<HTMLElement>("[data-scene-help]")!;
  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  const events = new AbortController();
  const scene = new Scene();
  const world = new Group();
  scene.add(world);
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch (error) {
    console.warn("WebGL scene unavailable:", error);
    root.dataset.state = "fallback";
    status.textContent = "STATIC WORLD";
    help.textContent = "3Dの代わりに静止画を表示しています。作品は下へ。";
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  host.append(renderer.domElement);
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute("role", "img");
  canvas.setAttribute(
    "aria-label",
    "浮島のダンジョン。ドラッグ、または左右の矢印キーで回転。Tabキーで3つのクリスタルを選択し、Enterで集められます。",
  );
  canvas.style.touchAction = "pan-y";
  const camera = new OrthographicCamera(-6, 6, 5, -5, 0.1, 80);
  camera.position.set(10, 10, 13);
  camera.lookAt(0, 0.2, 0);

  scene.add(new AmbientLight(0xa9bba2, 2));
  const keyLight = new DirectionalLight(0xe7ffd3, 4);
  keyLight.position.set(-3, 10, 7);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.left = -7;
  keyLight.shadow.camera.right = 7;
  keyLight.shadow.camera.top = 7;
  keyLight.shadow.camera.bottom = -7;
  keyLight.shadow.bias = -0.001;
  scene.add(keyLight);
  const rimLight = new DirectionalLight(0x94bd71, 2.4);
  rimLight.position.set(6, 3, -5);
  scene.add(rimLight);

  const materials: Material[] = [];
  function stone(color: number, roughness = 0.9) {
    const material = new MeshStandardMaterial({ color, roughness });
    materials.push(material);
    return material;
  }
  const stones = [
    stone(0x69715a),
    stone(0x7c8267),
    stone(0x5c6651),
    stone(0x899072),
  ];
  const earth = [stone(0x303b2c), stone(0x3d4834), stone(0x4c553d)];
  const moss = stone(0x638043);
  const dark = stone(0x252c22);
  const gold = stone(0xb9a362, 0.5);
  const wood = stone(0x654a2d);
  const cloth = stone(0xbfcda4);
  const crystalMat = new MeshStandardMaterial({
    color: 0xd3ff86,
    emissive: 0x90d531,
    emissiveIntensity: 1.4,
    roughness: 0.25,
    metalness: 0.2,
  });
  materials.push(crystalMat);
  const flameMat = new MeshBasicMaterial({ color: 0xffc275 });
  materials.push(flameMat);
  const cube = new BoxGeometry(1, 1, 1);
  const gemGeometry = new OctahedronGeometry(0.28);
  const geometries: BufferGeometry[] = [cube, gemGeometry];
  function box(
    x: number,
    y: number,
    z: number,
    sx: number,
    sy: number,
    sz: number,
    material: Material,
    parent = world,
  ) {
    const mesh = new Mesh(cube, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  let seed = 173;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Stepped silhouette, separate floor stones, and layered rock underneath.
  for (let x = -3; x <= 3; x++) {
    for (let z = -3; z <= 3; z++) {
      if ((Math.abs(x) === 3 && Math.abs(z) === 3) || (x === -3 && z === -2))
        continue;
      const y = -0.15 + random() * 0.07;
      box(
        x,
        y,
        z,
        0.98,
        0.27,
        0.98,
        stones[Math.floor(random() * stones.length)],
      );
      const depth = 0.55 + random() * 1.1;
      box(
        x,
        -0.35 - depth / 2,
        z,
        0.98,
        depth,
        0.98,
        earth[Math.floor(random() * earth.length)],
      );
      if (random() > 0.7)
        box(
          x + (random() - 0.5) * 0.4,
          y + 0.16,
          z + (random() - 0.5) * 0.4,
          0.4 + random() * 0.3,
          0.045,
          0.35 + random() * 0.4,
          moss,
        );
    }
  }
  for (let i = 0; i < 3; i++) {
    box(0.15, -0.18 - i * 0.23, 3.5 + i * 0.45, 1.75, 0.25, 0.52, stones[1]);
  }
  // Broken back walls keep the central portal readable from the default angle.
  for (let x = -2; x <= 2; x++) {
    const height = x === 0 ? 1 : x === -2 ? 3 : 2;
    for (let y = 0; y < height; y++)
      box(x, 0.3 + y * 0.51, -3, 0.96, 0.48, 0.53, stones[(x + y + 6) % 4]);
  }
  for (let z = -2; z <= 0; z++) {
    box(-3, 0.25, z, 0.5, 0.5, 0.96, stones[2]);
    if (z === -1) box(-3, 0.76, z, 0.52, 0.5, 0.9, stones[0]);
  }
  function pillar(x: number, z: number, height: number) {
    box(x, 0.1, z, 0.8, 0.25, 0.8, stones[1]);
    box(x, height / 2 + 0.2, z, 0.48, height, 0.48, stones[0]);
    box(x, height + 0.3, z, 0.72, 0.2, 0.72, stones[3]);
    box(x, height + 0.43, z, 0.4, 0.08, 0.4, moss);
  }
  pillar(-2.5, -2.4, 2.3);
  pillar(2.55, -2.2, 1.3);
  pillar(-2.5, 1.9, 0.65);
  // The gate is an original procedural object, not an external model.
  for (const x of [-0.98, 0.98]) {
    box(x, 0.12, -1.45, 0.85, 0.22, 0.9, stones[1]);
    for (let i = 0; i < 5; i++)
      box(x, 0.48 + i * 0.46, -1.45, 0.49, 0.43, 0.62, stones[(i + 1) % 4]);
    box(x, 2.68, -1.45, 0.66, 0.24, 0.77, stones[3]);
    box(x, 1.5, -1.11, 0.035, 1.85, 0.025, crystalMat);
  }
  box(0, 2.89, -1.45, 2.6, 0.32, 0.75, stones[1]);
  box(0, 3.12, -1.45, 1.9, 0.13, 0.63, stones[0]);
  const keystone = box(0, 2.88, -1.02, 0.3, 0.3, 0.16, crystalMat);
  keystone.rotation.z = Math.PI / 4;
  const portalMaterial = new ShaderMaterial({
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
    uniforms: { time: { value: 0 }, unlocked: { value: 0 } },
    vertexShader:
      "varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader: `varying vec2 vUv; uniform float time; uniform float unlocked;
      void main(){vec2 p=vUv-.5; float edge=pow(abs(p.x)*2.,7.); float bands=sin(vUv.y*18.-time*.8)*.035;
      float center=1.-length(p*vec2(1.5,1.)); vec3 color=mix(vec3(.28,.45,.12),vec3(.76,1.,.43),edge+unlocked*.45);
      gl_FragColor=vec4(color,.14+edge*.65+center*.16+bands+unlocked*.16);}`,
  });
  materials.push(portalMaterial);
  const portalGeometry = new PlaneGeometry(1.5, 2.5);
  geometries.push(portalGeometry);
  const portal = new Mesh(portalGeometry, portalMaterial);
  portal.position.set(0, 1.48, -1.44);
  world.add(portal);
  const ringGeometry = new CylinderGeometry(0.9, 0.9, 0.025, 40, 1, true);
  geometries.push(ringGeometry);
  const ring = new Mesh(ringGeometry, crystalMat);
  ring.position.set(0, 0.05, -0.85);
  world.add(ring);

  // Lanterns, chest, grass, and a tiny explorer bring scale to the environment.
  for (const [x, z] of [
    [-1.9, -0.6],
    [1.9, -0.6],
  ]) {
    box(x, 0.38, z, 0.14, 0.75, 0.14, dark);
    box(x, 0.8, z, 0.38, 0.12, 0.38, gold);
    const flame = new Mesh(gemGeometry, flameMat);
    flame.position.set(x, 1.06, z);
    flame.scale.set(0.6, 1, 0.6);
    world.add(flame);
  }
  const chest = new Group();
  chest.position.set(2.2, 0.05, 1.4);
  chest.rotation.y = -0.3;
  world.add(chest);
  box(0, 0.23, 0, 0.8, 0.43, 0.57, wood, chest);
  box(0, 0.51, 0, 0.84, 0.17, 0.61, gold, chest);
  box(0, 0.3, 0.3, 0.15, 0.22, 0.05, gold, chest);
  for (const x of [-0.3, 0.3]) box(x, 0.28, 0.3, 0.06, 0.46, 0.04, dark, chest);
  for (const [x, z] of [
    [-2.2, 0.4],
    [2.6, 2.3],
    [1.8, -2.6],
    [-1.7, 2.6],
  ]) {
    for (let i = 0; i < 4; i++) {
      const grass = box(
        x + random() * 0.4,
        0.12,
        z + random() * 0.4,
        0.055,
        0.25 + random() * 0.25,
        0.065,
        moss,
      );
      grass.rotation.z = (random() - 0.5) * 0.5;
    }
  }
  const player = new Group();
  player.position.set(-0.45, 0.08, 1.7);
  player.rotation.y = -0.3;
  world.add(player);
  box(-0.13, 0.16, 0, 0.15, 0.3, 0.18, dark, player);
  box(0.13, 0.16, 0, 0.15, 0.3, 0.18, dark, player);
  box(0, 0.49, 0, 0.42, 0.44, 0.27, cloth, player);
  box(0, 0.8, 0, 0.32, 0.28, 0.3, stones[3], player);
  box(0, 0.84, 0.17, 0.27, 0.1, 0.06, dark, player);
  box(0, 0.85, 0.205, 0.16, 0.025, 0.01, crystalMat, player);
  const cape = box(0, 0.45, -0.18, 0.43, 0.57, 0.07, moss, player);
  cape.rotation.x = -0.2;
  const sword = box(0.36, 0.45, 0.08, 0.07, 0.6, 0.055, gold, player);
  sword.rotation.z = -0.3;

  const crystalPositions = [
    new Vector3(-2, 0.85, 1),
    new Vector3(2.35, 0.9, -1),
    new Vector3(0.6, 0.75, 2.65),
  ];
  const crystals = crystalPositions.map((position) => {
    const gem = new Mesh(gemGeometry, crystalMat);
    gem.position.copy(position);
    gem.scale.y = 1.65;
    world.add(gem);
    const pedestal = box(
      position.x,
      0.1,
      position.z,
      0.44,
      0.16,
      0.44,
      stones[1],
    );
    pedestal.rotation.y = Math.PI / 4;
    return gem;
  });
  const dustGeometry = new BufferGeometry();
  const dustVertices = [];
  for (let i = 0; i < 36; i++)
    dustVertices.push((random() - 0.5) * 8, random() * 4, (random() - 0.5) * 7);
  dustGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(dustVertices, 3),
  );
  geometries.push(dustGeometry);
  const dustMaterial = new PointsMaterial({
    color: 0xc9eaa1,
    size: 0.025,
    transparent: true,
    opacity: 0.55,
  });
  materials.push(dustMaterial);
  const dust = new Points(dustGeometry, dustMaterial);
  world.add(dust);

  let width = 1,
    height = 1;
  let time = 0,
    previousTime = 0,
    frame = 0;
  let paused = motionPreference.matches;
  let inView = true,
    disposed = false,
    contextLost = false;
  const collected = new Set<number>();
  const projected = new Vector3();
  function updateLabels() {
    world.updateMatrixWorld(true);
    crystals.forEach((gem, index) => {
      gem.getWorldPosition(projected).project(camera);
      buttons[index].style.transform =
        `translate(${(projected.x * 0.5 + 0.5) * width - 22}px,${(-projected.y * 0.5 + 0.5) * height - 22}px)`;
    });
  }
  function render(now: number) {
    frame = 0;
    if (disposed || contextLost || !inView || document.hidden) return;
    const delta = previousTime
      ? Math.min((now - previousTime) / 1000, 0.05)
      : 0;
    previousTime = now;
    if (!paused) {
      time += delta;
      world.position.y = Math.sin(time * 0.6) * 0.07;
      portalMaterial.uniforms.time.value = time;
      dust.rotation.y = time * 0.025;
      crystals.forEach((gem, index) => {
        gem.rotation.y = time * 0.7 + index;
        gem.position.y =
          crystalPositions[index].y + Math.sin(time * 1.8 + index * 2) * 0.1;
      });
    }
    updateLabels();
    renderer.render(scene, camera);
    if (!paused) frame = requestAnimationFrame(render);
  }
  function requestRender() {
    if (!frame && !disposed && !contextLost && inView && !document.hidden)
      frame = requestAnimationFrame(render);
  }
  function setPaused(value: boolean) {
    paused = value;
    pauseButton.setAttribute("aria-pressed", String(paused));
    pauseButton.setAttribute(
      "aria-label",
      paused ? "アニメーションを再開" : "アニメーションを一時停止",
    );
    pauseButton.title = paused
      ? "アニメーションを再開"
      : "アニメーションを一時停止";
    pauseButton.textContent = paused ? "▷" : "Ⅱ";
    previousTime = 0;
    requestRender();
  }
  function collect(index: number) {
    if (collected.has(index)) return;
    collected.add(index);
    crystals[index].visible = false;
    const wasFocused = document.activeElement === buttons[index];
    buttons[index].hidden = true;
    if (collected.size === 3) {
      status.textContent = "PORTAL OPEN! 探索クリア ✦ 3 / 3";
      portalMaterial.uniforms.unlocked.value = 1;
      help.textContent = "小さな冒険をありがとう。次は作品の世界へ！";
      if (wasFocused) resetButton.focus({ preventScroll: true });
    } else {
      status.textContent = `クリスタルを見つけよう　${collected.size} / 3`;
      if (wasFocused)
        buttons
          .find((_, next) => !collected.has(next))
          ?.focus({ preventScroll: true });
    }
    requestRender();
  }
  buttons.forEach((button, index) =>
    button.addEventListener("click", () => collect(index), {
      signal: events.signal,
    }),
  );
  resetButton.addEventListener(
    "click",
    () => {
      collected.clear();
      crystals.forEach((gem, index) => {
        gem.visible = true;
        buttons[index].hidden = false;
      });
      world.rotation.y = 0;
      portalMaterial.uniforms.unlocked.value = 0;
      status.textContent = "クリスタルを見つけよう　0 / 3";
      help.textContent = "ドラッグで回転 · 光るクリスタルをクリック";
      requestRender();
    },
    { signal: events.signal },
  );
  pauseButton.addEventListener("click", () => setPaused(!paused), {
    signal: events.signal,
  });
  motionPreference.addEventListener(
    "change",
    (event) => setPaused(event.matches),
    { signal: events.signal },
  );

  let drag: { id: number; x: number; y: number; angle: number } | null = null;
  canvas.addEventListener(
    "pointerdown",
    (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      drag = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        angle: world.rotation.y,
      };
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    },
    { signal: events.signal },
  );
  canvas.addEventListener(
    "pointermove",
    (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      // The browser retains vertical touch scrolling; horizontal gestures rotate.
      if (event.pointerType === "touch" && Math.abs(dy) > Math.abs(dx)) return;
      world.rotation.y = drag.angle + dx * 0.006;
      requestRender();
    },
    { signal: events.signal },
  );
  const endDrag = () => {
    drag = null;
    canvas.style.cursor = "grab";
  };
  canvas.addEventListener("pointerup", endDrag, { signal: events.signal });
  canvas.addEventListener("pointercancel", endDrag, { signal: events.signal });
  canvas.addEventListener("lostpointercapture", endDrag, {
    signal: events.signal,
  });
  canvas.addEventListener(
    "keydown",
    (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home"].includes(event.key)) return;
      event.preventDefault();
      world.rotation.y =
        event.key === "Home"
          ? 0
          : world.rotation.y + (event.key === "ArrowLeft" ? -0.2 : 0.2);
      requestRender();
    },
    { signal: events.signal },
  );
  canvas.style.cursor = "grab";
  const resizeObserver = new ResizeObserver(() => {
    width = host.clientWidth;
    height = host.clientHeight;
    if (!width || !height) return;
    const aspect = width / height;
    const viewHeight = aspect < 1.1 ? 11.7 : 10.1;
    camera.left = (-viewHeight * aspect) / 2;
    camera.right = (viewHeight * aspect) / 2;
    camera.top = viewHeight / 2;
    camera.bottom = -viewHeight / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    requestRender();
  });
  resizeObserver.observe(host);
  const visibilityObserver = new IntersectionObserver((entries) => {
    inView = entries.some((entry) => entry.isIntersecting);
    if (!inView) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    previousTime = 0;
    requestRender();
  });
  visibilityObserver.observe(root);
  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      previousTime = 0;
      requestRender();
    },
    { signal: events.signal },
  );
  canvas.addEventListener(
    "webglcontextlost",
    (event) => {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frame);
      frame = 0;
      root.dataset.state = "fallback";
      labels.hidden = true;
      canvas.hidden = true;
      pauseButton.disabled = true;
      resetButton.disabled = true;
      status.textContent = "STATIC WORLD";
      help.textContent = "3Dの表示が中断されたため、静止画を表示しています。";
    },
    { signal: events.signal },
  );
  canvas.addEventListener(
    "webglcontextrestored",
    () => {
      contextLost = false;
      root.dataset.state = "ready";
      labels.hidden = false;
      canvas.hidden = false;
      pauseButton.disabled = false;
      resetButton.disabled = false;
      status.textContent =
        collected.size === 3
          ? "PORTAL OPEN! 探索クリア ✦ 3 / 3"
          : `クリスタルを見つけよう　${collected.size} / 3`;
      help.textContent =
        collected.size === 3
          ? "小さな冒険をありがとう。次は作品の世界へ！"
          : "ドラッグで回転 · 光るクリスタルをクリック";
      previousTime = 0;
      requestRender();
    },
    { signal: events.signal },
  );
  window.addEventListener(
    "pagehide",
    (event) => {
      if (event.persisted) return;
      disposed = true;
      cancelAnimationFrame(frame);
      events.abort();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    },
    { signal: events.signal },
  );
  window.addEventListener(
    "pageshow",
    () => {
      previousTime = 0;
      requestRender();
    },
    { signal: events.signal },
  );
  root.dataset.state = "ready";
  labels.hidden = false;
  pauseButton.disabled = false;
  resetButton.disabled = false;
  setPaused(paused);
}
