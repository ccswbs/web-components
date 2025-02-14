<script>
  let { href, label, title, children } = $props();
</script>

<a
  class="w-fit underline decoration-transparent transition-colors focus:decoration-black-contrast hover:decoration-black-contrast"
  href={href}
  title={title ?? undefined}
  aria-label={label ?? undefined}
>
  {@render children()}
</a>