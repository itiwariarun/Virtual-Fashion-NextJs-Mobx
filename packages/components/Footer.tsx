import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer
      aria-label="Footer"
      className="w-full py-4 text-center bg-main text-gray-50 border-t border-gray-700 text-sm left-0 font-medium shadow z-40"
    >
      <span className="block">
        E-commerce App{" "}
        <span className="font-semibold text-indigo-50">© 2025</span>
      </span>
    </footer>
  );
};

export default Footer;
