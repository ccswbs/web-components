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
    class="flex justify-center items-center w-fit gap-2 border-0 border-b-2 border-dotted border-transparent text-blue-400 transition-colors focus:border-current hover:border-current"
  >
    <FontAwesomeIcon icon={faPhoneFlip} />
    <span>{address.phoneNumber}</span>
  </a>
</address>
