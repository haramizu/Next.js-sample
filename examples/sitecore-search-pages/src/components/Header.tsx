import LocaleSelector from "@/components/LocaleSelector";
import PreviewSearch from "@/widgets/PreviewSearchBasic";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className="flex flex-wrap m-6">
        <div className="w-6/12 md:w-3/12">
          <Image
            src="/search-horizontal-color-black-txt.svg"
            alt="Search Logo"
            width="120"
            height="40"
          />
        </div>
        <div className="hidden md:flex md:justify-center md:w-6/12">
          <div className="w-full">
            <PreviewSearch rfkId="rfkid_6"></PreviewSearch>
          </div>
        </div>
        <div className="w-6/12 md:w-3/12 flex justify-end">
          <LocaleSelector />
        </div>
      </header>
    </>
  );
}
