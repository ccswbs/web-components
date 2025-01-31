<script>
  import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons';
  import FontAwesomeIcon from '../../lib/font-awesome-icon.svelte';
  import { address } from './data/guelph.js';
</script>

<address class="flex flex-col gap-1 not-italic">
  <strong>{address.title}</strong>
  <span>{address.street},</span>
  <span>{address.city}, Ontario, Canada</span>
  <span>{address.postalCode}</span>
  <a
    href={`tel:${address.phoneNumber}`}
    class="w-fit underline decoration-transparent transition-colors focus:decoration-white hover:decoration-white text-white"
  >
    {address.phoneNumber}
  </a>
</address>
