<script>
  import { address } from './data/guelph.js';
  import Link from './link.svelte';
</script>

<address class="flex flex-col gap-1 not-italic">
  <strong class="flex-1">{address.title}</strong>
  <span class="flex-1">{address.street},</span>
  <span class="flex-1">{address.city}, Ontario, Canada</span>
  <span class="flex-1">{address.postalCode}</span>
  <div class="flex flex-1 items-center h-full">
    <Link href={`tel:${address.phoneNumber}`}>{address.phoneNumber}</Link>
  </div>
</address>
