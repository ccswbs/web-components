<script>
  export let icon;

  const width = icon.icon[0];
  const height = icon.icon[1];
  const iconPathData = icon.icon[4];
</script>

<svg class="fa-icon" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
  {#if Array.isArray(iconPathData)}
    {#each iconPathData as pathData}
      <path d={pathData} />
    {/each}
  {:else}
    <path d={iconPathData} />
  {/if}
</svg>
