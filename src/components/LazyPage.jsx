import {Suspense} from "react";
import PageLoader from "@/components/PageLoader.jsx";

export default function LazyPage({children}){
    return <Suspense fallback={<PageLoader/>}>{children}</Suspense>
}