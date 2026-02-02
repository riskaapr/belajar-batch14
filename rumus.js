export function kalkulator(angka1, angka2, operator) {
    switch (operator) {
        case "+":
            return angka1 + angka2;
        case "-":
            return angka1 - angka2;
        case "*":
            return angka1 * angka2;
        case "/":
      // Validasi pembagian dengan nol
        if (angka2 === 0) return "Kesalahan: Pembagian dengan nol!";
            return angka1 / angka2;
        default:
            return "Operator tidak valid!";
    }
}