# card-game

Gra karciana (oczko) - JS

👉 Gra zawiera na chwilę obecną funkcjonalność z trybem singleplayer.
Do dodania funkcjonalność z multiplayerem.

OPIS GRY 👇
Oczko – prosta gra karciana, polegająca na dobieraniu kolejnych kart dotąd, aby osiągnąć wartość liczbową posiadanych kart jak najbliższą (ale nie większą niż) 21.
Gracz otrzymuje kolejne karty z talii dotąd, aż sam zdecyduje, że nie chce już więcej kart, lub otrzyma wynik 21 lub większy.
Suma większa lub równa 22 oznacza przegraną. Wyjątkiem od tej reguły jest perskie oczko (dwa asy). Perskie oczko zawsze oznacza wygraną.
Jeśli żaden z graczy nie otrzyma wyniku 21 wygrywa ten który był najbliżej tej wartości. W oczko gra się talią od 2 do asa.
Punktacja:
Karty 2 do 10 mają wartość równą wartości karty
walet – 2 pkt.
dama – 3 pkt.
król – 4 pkt.
As – 11 pkt.
A) Gracz powinien mieć możliwość wyboru trybu gry pomiędzy rozgrywką dla pojedynczego gracza, a trybem wieloosobowym.
B) Gracz powinien otrzymać 2 karty z talii używając API(deckofcardsapi.com). Gracz powinien widzieć jakie karty otrzymał oraz sumę punktów, którą aktualnie posiada.
C1) Gracz otrzymał dwa asy - automatycznie zostaje zwycięzcą, należy mu to zakomunikować i przejść do punktu E.
C2) Gracz ma możliwość spasować lub dobrać kartę naciskając odpowiedni przycisk.
  C2.1) Jeżeli gracz spasuje należy przejść do tury kolejnego gracza i powtórzyć dla niego kolejne kroki zaczynając od punktu B. Jeżeli nie ma więcej graczy, należy przejść do punktu D.
  C2.2) Jeżli gracz zdecydował się dobrać kartę należy pobrać kolejną kartę z talii i zaktualizować rękę gracza oraz liczbę jego punktów.
    C2.2.1) Jeżeli suma punktów gracza >= 22 gracz przegrywa i należy mu to zakomunikować i przejść do tury koljnego gracza zaczynając od punktu B. Jeżeli pozostał tylko 1 gracz, a wszyscy pozostali mają sumę punktów >= 22 należy ogłosić jego zwycięstwo i przejść do punktu E.
    C2.2.2) Jeżli suma punktów gracza < 22 należy powrócić do punktu C2.
D) Należy porównać wyniki i zakomunikować wynik.
E) Umożliwić rozegranie ponownej gry.
