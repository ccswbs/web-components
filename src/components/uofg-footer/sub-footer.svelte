<script>
  export let links;
</script>

<ul class="flex flex-wrap items-center justify-center bg-white p-6 px-[max(calc((100%-1320px)/2),2rem)]">
  {#each links as { text, href }}
    <li class="p-6">
      <a
        class="transition-all decoration-transparent text-[#2e74bb] hover:text-[#1a4168] focus:text-[#1a4168] hover:underline focus:underline hover:decoration-current focus:decoration-current"
        {href}
      >
        {text}
      </a>
    </li>
  {/each}
</ul>
