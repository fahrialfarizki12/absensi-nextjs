export const FormatTanggal = (Tanggal)=>{
	return new Date(Tanggal).toLocaleString("id-ID",{
		day: "numeric",
		month: "long",
		year: "numeric"
	})}


export const FormatTanggalAbsen = (tanggal) =>{
	return new Date(tanggal).toLocaleString("id-ID",{
		day: "numeric",
		month: "numeric",
		year: "numeric",
	})
}

export const FormatJam = (jam)=>{
	return new Date(jam).toLocaleString("en-GB",{
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZone: "Asia/Jakarta"
	})
}

