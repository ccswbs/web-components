<script>
  let { links } = $props();
</script>

<ul class="flex flex-wrap items-center justify-center bg-white p-3 px-[max(calc((100%-1320px)/2),2rem)]">
  {#each links as { text, href }}
    <li class="p-3">
      <a
        class="transition-all decoration-transparent text-blue hover:text-blue-focus focus:text-blue-focus hover:underline focus:underline hover:decoration-current focus:decoration-current"
        {href}
      >
        {text}
      </a>
    </li>
  {/each}
</ul>
