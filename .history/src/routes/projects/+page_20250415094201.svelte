<script>
    import { onMount } from 'svelte';
  
    // TO-DO: Combine into one loop; for some reason doing **/*.svelte doesn't work.
    let personal = [];
    const modules_p = import.meta.glob('$lib/components/projects/personal/*.svelte');
    onMount(async () => {
      const loaded = [];
  
      for (const path in modules_p) {
        const mod = await modules_p[path]();
        loaded.push(mod.default);
      }
  
      personal = loaded;
    });

    let coursework = [];
    const modules_c = import.meta.glob('$lib/components/projects/coursework/*.svelte');
    onMount(async () => {
      const loaded = [];
  
      for (const path in modules_c) {
        const mod = await modules_c[path]();
        loaded.push(mod.default);
      }
  
      coursework = loaded;
    });
</script>

<section class="personal-project">
    <h1 class="section-head">Personal Projects</h1>
    {#each personal as Project (Project.name)}
        <svelte:component this={Project} />
    {/each}
</section>

<section class="coursework">
    <h1 class="section-head">Coursework</h1>
    {#each coursework as Project (Project.name)}
        <svelte:component this={Project} />
    {/each}
</section>