<script>
  import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons';
  import FontAwesomeIcon from '../../lib/font-awesome-icon.svelte';
  import { address } from './data/guelph.js';
</script>

<address class="flex flex-col justify-between gap-4 not-italic">
  <strong>{address.title}</strong>
  <span>{address.street},</span>
  <span>{address.city}, Ontario, Canada</span>
  <span>{address.postalCode}</span>
  <a
    href={`tel:${address.phoneNumber}`}
    class="w-fit underline decoration-transparent transition-colors focus:decoration-blue-400 hover:decoration-blue-400 text-blue-400"
  >
    {address.phoneNumber}
  </a>
</address>
