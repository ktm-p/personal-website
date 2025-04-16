<script>
    import { onMount } from 'svelte';
  
    let projects = [];
  
    // import all Svelte components in the directory
    const modules = import.meta.glob('$lib/components/projects/*.svelte');
  
    onMount(async () => {
      const loaded = [];
  
      for (const path in modules) {
        const mod = await modules[path](); // Import the module
        loaded.push(mod.default); // Default export is the component
      }
  
      projects = loaded;
    });
</script>

<section class="personal-project">
    <h1 class="section-head">Personal Projects</h1>
    {#each personal as Project (Project.name)}
        <svelte:component this={Project} />
    {/each}
</section>