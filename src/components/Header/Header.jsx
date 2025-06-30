import CompanyLogo from '../../assets/logo.jpg';
import { useModal } from '../../Context/ModalProvider';
import CartButton from './CartButton';

export default function Headers() {
  return (
    <div id="main-header">
      <div className="img-Container flex justify-center items-center">
        <img
          className="w-15 rounded-full border-3 border-yellow-500 rounded-full"
          src={CompanyLogo}
        ></img>
        <span className="px-2 font-bold text-xl font-raleway text-yellow-500">
          REACTFOOD
        </span>
      </div>
      <CartButton />
    </div>
  );
}
