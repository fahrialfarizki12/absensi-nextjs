"use client";

import { useEffect,useActionState, useState } from "react";
import MapComponent from "@/components/dashboard/Absen/Map";
import ModalComponent from "@/components/dashboard/ModalComponen";
import FormComponent from "@/components/dashboard/FormComponent";

import { FaLocationDot } from "react-icons/fa6";
import Table from "@/components/dashboard/Absen/Table";
import { AbsenCreate } from "../Actions/action";
import { toast } from "react-toastify";
export default function AbsenPage() {
  const [coords, setCoords] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);

const [refreshKey,setRefreshKey] = useState(0)
	const [state,formAction,isPending] = useActionState(AbsenCreate,{})

	useEffect(()=>{

 if (state?.success === true) {
 			setRefreshKey((prev)=> prev + 1)
      setOpen(false);
      setPreview(null)
      toast.success(state.message);
    }

    if (state?.success === false) {
      setOpen(false);
      setPreview(null)
      toast.error(state.error);
    }

	},[state])
  // Cek izin langsung dari browser (lebih akurat)
  useEffect(() => {
    if (!navigator.permissions) {
      setChecking(false);
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((status) => {
        if (status.state === "granted") {
          // Browser memang sudah izinkan
          getLocation();
        } else {
          // Belum izin atau ditolak
          setAllowed(false);
        }

        setChecking(false);
      })
      .catch(() => {
        setChecking(false);
      });
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setAllowed(true);
      },
      () => {
        setAllowed(false);
      },
    );
  };

  if (checking) return <p>Memeriksa izin lokasi...</p>;

  //preview Image
  const handlePreview = (e) => {
    const files = e.target.files[0];
    if (!files) {
      setPreview(null);
      return
    }

    //buat url preview
    const url = URL.createObjectURL(files);
    setPreview(url);
  };
  return (
    <div>
      {!allowed && (
        <button className="btn bg-transpram text-white" onClick={getLocation}>
          <FaLocationDot /> Izinkan Lokasi
        </button>
      )}

      {allowed && coords && (
        <>
          <MapComponent lat={coords.lat} lon={coords.lon} />
          <div className="m-5">
            <button
              onClick={() => setOpen(true)}
              className="btn bg-transpram shadow text-white"
            >
              Absen Disini
            </button>
            <ModalComponent open={open} close={() => setOpen(false)}>
              <FormComponent
                Absen={true}
                Title="Absensi"
                coordsLat={coords.lat}
                coordsLon={coords.lon}
                preview={preview}
                FormAction={formAction}
                 
                Ispending={isPending}
                handlePreview={handlePreview}
              />
            </ModalComponent>
          </div>
      <div className="my-10 p-5">
        <Table mutateTriger={refreshKey} />
      </div>
        </>
      )}
      {/* Table Absen Siswa  */}
    </div>
  );
}
