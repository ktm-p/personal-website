<script>
    import { onMount } from 'svelte';
  
    let personal = [];
    let coursework = [];
  
    // Grab all Svelte files in both folders
    const modules = import.meta.glob('$lib/components/projects/**/*.{svelte}');
  
    onMount(async () => {
      const personalProjects = [];
      const courseworkProjects = [];
  
      for (const path in modules) {
        const mod = await modules[path]();
        const component = mod.default;
  
        if (path.includes('/personal/')) {
          personalProjects.push(component);
        } else if (path.includes('/coursework/')) {
          courseworkProjects.push(component);
        }
      }
  
      personal = personalProjects;
      coursework = courseworkProjects;
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