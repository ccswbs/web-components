<script>
  import { address } from './data/guelph.js';
  import Link from './link.svelte';
</script>

<address class="flex flex-col gap-1 not-italic">
  <strong>{address.title}</strong>
  <span>{address.street},</span>
  <span>{address.city}, Ontario, Canada</span>
  <span>{address.postalCode}</span>
  <div class="flex items-center h-full">
    <Link href={`tel:${address.phoneNumber}`}>{address.phoneNumber}</Link>
  </div>
</address>
