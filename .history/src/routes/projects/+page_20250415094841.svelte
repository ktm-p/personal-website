<script lang="ts">
    import type { ComponentType } from 'svelte';

    const personal: Record<string, { default: ComponentType }> =
        import.meta.glob('$lib/components/projects/personal/*.svelte', { eager: true });
</script>

<section class="personal-project">
    <h1 class="section-head">Personal Projects</h1>
    {#each Object.values(personal) as { default: Project }}
        <Project />
    {/each}
</section>