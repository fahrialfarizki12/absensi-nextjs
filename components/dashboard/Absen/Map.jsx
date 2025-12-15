"use client";

const MapComponent = ({ lat, lon }) => {
  if (!lat || !lon) return <p>Lokasi belum tersedia...</p>;

  const url = `https://www.openstreetmap.org/export/embed.html?&marker=${lat}%2C${lon}&zoom=150`;

  return (
    <>
      <div className="w-[50%] p-3 mb-10 text-sm bg-red-500/60 rounded-lg">
        <ul className="list-disc pl-5 space-y-2 text-white">
          <li>Absensi dibuka setiap hari melalui sistem.</li>
          <li>
            Batas akhir absensi adalah pukul <strong>10.00 WIB</strong>.
          </li>
          <li>
            Siswa yang belum melakukan absensi hingga melewati pukul 10.00 WIB
            akan secara otomatis tercatat sebagai <strong>Alpha</strong>.
          </li>
          <li>
            Status Alpha ditetapkan otomatis oleh sistem dan tidak dapat diubah
            oleh siswa.
          </li>
          <li>
            Siswa diharapkan melakukan absensi tepat waktu untuk menghindari
            status Alpha.
          </li>
        </ul>
      </div>
      <div className="w-full p-4 h-[300px] rounded-lg overflow-hidden bg-white shadow">
        <iframe src={url} className="w-full h-full" loading="lazy"></iframe>
      </div>
    </>
  );
};

export default MapComponent;
