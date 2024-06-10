import Navbar_Menu from "@/components/navbarMenu"
import CardProximamente from "@/components/cardProximamente"
export default function Agua() {
    return(
        <>
            <Navbar_Menu />
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-blue-700 text-3xl font-bold">Agua</h1>
                <CardProximamente />
            </div>
        </>
    )
}