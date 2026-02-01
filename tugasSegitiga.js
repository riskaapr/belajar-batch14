const rows = 4; // tinggi segitiga
    let i = 1; // jumlah baris
    do {
        let j = 1; // jumlah bintang
        let bintang = ''; 
        // jumlah bintang per baris
        do {
            bintang += '* ';
            j++;
        } while (j <= i); // Kondisi: cetak bintang selama jumlah bintang (j) <= jumlah baris (i)
        console.log(bintang);
        i++;
    } while (i <= rows); // Kondisi: mengulang selama jumlah baris (i) <= total baris (rows)