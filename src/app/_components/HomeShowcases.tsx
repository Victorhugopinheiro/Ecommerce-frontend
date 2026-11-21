"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import FranchiseStrip from "./FranchiseStrip";
import GtaSpotlight from "./GtaSpotlight";
import LastestsCollections from "./LatestCollections";
import { useHomeShowcase } from "@/hooks/gettingHomeShowcase";

export function HomeShowcases() {
    const { data, isPending, isError } = useHomeShowcase();

    console.log(data)

    useEffect(() => {
        if (isError) {
            toast.error("Erro ao carregar produtos.");
        }
    }, [isError]);

    if (isPending || isError || !data) {
        return null;
    }

    const hasFranchiseStrip = data.marvel.length > 0 || data.dc.length > 0;

    return (
        <>
            {data.bestsellers.length > 0 ? (
                <div className="container mx-auto">
                    <LastestsCollections products={data.bestsellers} />
                </div>
            ) : null}
            {data.gtaVi.length > 0 ? <GtaSpotlight products={data.gtaVi} /> : null}
            {hasFranchiseStrip ? (
                <div className="container mx-auto">
                    <FranchiseStrip title="Marvel" products={data.marvel} />
                    <FranchiseStrip title="DC" products={data.dc} />
                </div>
            ) : null}
        </>
    );
}
