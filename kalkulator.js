async function getExchangeRate(currencyCode) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyCode}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const exchangeRates = await response.json();
    return exchangeRates.rates['PLN'];
}

async function Przelicz() {
    const kwota = parseFloat(document.f.kwota.value);
    const waluta = document.f.waluta.value;
    const stawkavat = parseFloat(document.f.stawkavat.value);
    const obliczvat = document.f.obliczvat.checked;

    let wynik;

    try {
        const walutaRate = await getExchangeRate(waluta);
        wynik = obliczvat ? (kwota / walutaRate * stawkavat) : (kwota / walutaRate);
    } catch (error) {
        console.error("Nie udało się pobrać kursu waluty:", error);
        return;
    }

    wyswietlWynik(wynik);
}

function wyswietlWynik(wynik) {
    const wynikZaokraglony = parseFloat(wynik).toFixed(2);
    const wynikElement = document.getElementById('wynik');
    wynikElement.textContent = `${wynikZaokraglony} zł`;
}
