"use client";

import Image from "next/image";

const FormComponent = ({
  Absen,
  Title,
  FormAction,
  coordsLat,
  coordsLon,
  preview,
  handlePreview,
  Ispending,
  Journal,
  TitleJournal,
  textButton

}) => {
  return (
    <>
      <h1 className="capitalize text-xl font-semibold">{Absen ? Title : TitleJournal}</h1>
      <form action={FormAction} className="flex flex-col mt-5">
        {Absen && (
          <>
            <div className="mb-5">
              <label className="floating-label">
                <span>Latitude</span>
                <input
                  type="text"
                  placeholder="Latitude"
                  required
                  readOnly
                  value={coordsLat}
                  name="latitude"
                  className="input input-md w-full outline-0"
                />
              </label>
            </div>
            <div className="mb-5">
              <label className="floating-label">
                <span>Longitude</span>
                <input
                  type="text"
                  placeholder="Longitude"
                  required
                  readOnly
                  value={coordsLon}
                  name="longitude"
                  className="input input-md w-full outline-0"
                />
              </label>
            </div>
            <div className="mb-5">
              <input
                type="file"
                placeholder="Foto Absen"
                required
                onChange={handlePreview}
                name="absen_photo"
                className="file-input w-full outline-0"
              />
            </div>
            {/* Preview Image  */}
            {preview && (
              <div className="w-full mb-4 bg-gray-200 p-4 rounded">
                <Image
                  className="w-full object-center "
                  width={50}
                  height={50}
                  src={preview}
                  alt="Preview Image"
                />
              </div>
            )}
            <button
              disabled={Ispending}
              className="btn disabled:bg-transpram/50 shadow bg-transpram text-white w-full"
            >
              {Ispending ? (
                <span className="loading loading-spinner  loading-md"></span>
              ) : (
                "Absen Sekarang"
              )}
            </button>
          </>
        )}

        {Journal && (
          <>
            <div className="mb-5">
              <label className="floating-label">
                <span>Title</span>
                <input
                  type="text"
                  placeholder="Title"
                  required
                  name="title"
                  className="input input-md w-full outline-0"
                />
              </label>
            </div>
            <div className="mb-5">
              <label className="floating-label">
                <span>Description</span>
                <input
                  type="text"
                  placeholder="Description"
                  required
                  name="description"
                  className="input input-md w-full outline-0"
                />
              </label>
            </div>
            <div className="mb-5">
              <label className="floating-label">
                <span>Latitude</span>
                <input
                  type="text"
                  placeholder="Latitude"
                  required
                  readOnly
                  value={coordsLat}
                  name="latitude"
                  className="input input-md w-full outline-0"
                />
              </label>
            </div>
            <div className="mb-5">
              <label className="floating-label">
                <span>Longitude</span>
                <input
                  type="text"
                  placeholder="Longitude"
                  required 
                  value={coordsLon}
                  readOnly
                  name="longitude"
                  className="input input-md w-full outline-0"
                />
              </label>
            </div>
            <div className="mb-5">
              <input
                type="file"
                placeholder="Journal Foto"
                required
                onChange={handlePreview}
                name="journal_photo"
                className="file-input w-full outline-0"
              />
            </div>
            {/* Preview Image  */}
            {preview && (
              <div className="w-full mb-4 bg-gray-200 p-4 rounded">
                <Image
                  className="w-full object-center "
                  width={50}
                  height={50}
                  src={preview}
                  alt="Preview Image"
                />
              </div>
            )}
            <button
              disabled={Ispending}
              className="btn disabled:bg-transpram/50 shadow bg-transpram text-white w-full"
            >
              {Ispending ? (
                <span className="loading loading-spinner  loading-md"></span>
              ) : (
                textButton
              )}
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default FormComponent;
