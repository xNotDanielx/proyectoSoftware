import Navbar_Menu from "@/components/navbarMenu";
export default function Estadistica() {
  return (
    <>
      <div className="flex gap-96">
        <Navbar_Menu />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-blue-700 text-3xl font-bold">Seguimiento de comidas</h1>
          
        </div>
      </div>
    </>
  );
}
