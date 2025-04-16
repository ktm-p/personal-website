<script>
    import { onMount } from 'svelte';
  
    let projects = [];
  
    const modules = import.meta.glob('$lib/components/projects/coursework/*.svelte');
  
    onMount(async () => {
      const loaded = [];
  
      for (const path in modules) {
        const mod = await modules[path]();
        loaded.push(mod.default);
      }
  
      projects = loaded;
    });
</script>

<section class="personal-project">
    <h1 class="section-head">Personal Projects</h1>
    {#each projects as Project (Project.name)}
        <svelte:component this={Project} />
    {/each}
</section>