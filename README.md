# Wordcloud
_A word cloud is a visual representation of text data, typically used to depict keyword tags on websites, or to visualize free form text. Tags are usually single words, and the importance of each tag is shown with font size or color. This format is useful for quickly perceiving the most prominent terms and for locating a term alphabetically to determine its relative prominence._ (adopted from Wikipedia, https://en.wikipedia.org/wiki/Tag_cloud)

## Schulprojekt (Projekt Wordcloud)
Hier wird ein Shell-Skript entstehen, das einen beliebigen ASCII-codierten Text analysiert, und die häufigsten sinntragenden Wörter in einem Bild darstellt. Dabei soll die Schriftgröße der Häufigkeit entsprechen und die einzelnen Worte zufällig (noch gut lesbar) gedreht und an sinnvoll zufälligen Koordinaten erscheinen.

### Anforderungen / Requirements
Das Programm (das shell-skript) soll "wordcloud.sh" heißen.

Es gibt einen Kommentar, aus dem hervorgeht, wer der Autor (die Autoren) des Programms sind.

Das Programm nimmt fünf Kommandozeilenargumente in der folgenden Reihenfolge entgegen:

- der Name der zu analysierenden Datei
- der Name des auszugebenden Bildes.
- die Auflösung des Bildes (z.B.:1024x768)
- die gewünschte Anzahl der häufigsten Wörter
- der Name der verwendeten Stoppwortliste (falls man andere Sprachen möchte)

Falls (von hinten nach vorne) Kommandozeilenargumente fehlen, soll das Programm sinnvolle default-Werte annehmen. Nur der Name der zu analysierenden Datei muss angegeben werden. Wenn der fehlt, muss das Programm abbrechen und eine Fehlermeldung erzeugen. z.B.: könnte man die Anzahl der gewünschten Wörter auf 15 setzen und eine deutsche Standard-Stoppwortliste verwenden.

- [ ] Das Programm soll die Größe der Schrift nach oben und unten begrenzen, so dass in jedem Fall etwas sinnvolles auf dem Bild erscheint.
- [ ] Das Programm soll sinnvoll reagieren, wenn es weniger Worte im Text vorfindet, als gewünscht sind.
- [ ] Schön wäre eine lineare Skalierung der Schriftgröße.
- [ ] Schön wären Schatten hinter der Schrift.
- [ ] Schön wäre eine gleichmäßige zufällige Verteilung der Wörter auf dem Bild.
- [ ] Schön wäre eine Beschränkung auf wenige Winkel, so dass alles noch gut lesbar ist.

Umsetzung der schön wäre Anforderungen geben Bonuspunkte bei der Beurteilung.

### Testdaten
Eure Programme werden mit folgenden Testfällen (automatisch) getestet:

- (`01_einwortsehroft.txt`) Der Text enthält nur ein Wort und das sehr oft. (Prüft die Begrenzungen)
- (`02_15_worte.txt`) Der Text enthält nur 15 verschiedene Worte. Die Worte haben dann alle dieselbe Größe.
- (`03_ein_wort.txt`) Der Text enthält nur ein Wort nur einmal. Das Wort muss dann auch erscheinen. Das ist die kleinste sinnvolle Datei.
- (`04_stoppworte_100mal.txt`) Der Text enthält nur Stopworte. (Die Stopwortliste 100 mal wiederholt) Hier bleibt das Bild leer.
- (`05_traumdeutung.txt`) Ein sinnvoller Beispieltext.

Der Test wird automatisch durchgeführt:
```
for file in "01_einwortsehroft.txt 02_15_worte.txt 03_ein_wort.txt 04_stoppworte_100mal.txt 05_traumdeutung.txt"; do
    bash wordcloud.sh $file ${file}.png 800x600 20 stoppwortliste
done
```
Nach dem Lauf (der nicht abbrechen sollte) sind die fünf gewünschten Bilder im aktuellen Verzeichnis.

### Beurteilung
Abzugeben ist eine Datei: wordcloud-nachname-vorname.sh

Einserseits wird der Quelltext und die produzierten Bilder bewertet.

Andererseits wird die Projektarbeit beurteilt:
```
2015-2016/11ING1

Beurteilung der Projektarbeit für ____________________im Projekt "Word-Cloud"

---------------------------------------------------+-------------------------+
Qualität:                                          |                         |
                     Projektarbeit vorangetrieben, |                         | 
                        eigene Ideen, gute Fragen, | 10 9 8                  |
     Fehlermeldungen schnell richtig interpretiert |                         | 
                                                   |                         | 
                           teilweise eigene Ideen, |                         | 
                              Unterricht verfolgt, |        7 6 5 4          | 
                          meist richtige Antworten |                         | 
                                                   |                         | 
                         eher Gesagtes wiederholt, |                         | 
                   immer wieder dieselben Fehler,  |                3 2 1 0  | 
                        Fehlermeldungen ignoriert  |                         | 
---------------------------------------------------+-------------------------+
Haltung, Biss, Vorbereitung, Material:             |                         |
                    Inhalte selbständig erarbeitet | 20 19 18 17             | 
                   praktisch keine Hilfen benötigt |                         | 
                                                   |                         | 
       Inhalte mit wenig Hilfen seblstständig      |    16 15 14 13          | 
                                    erarbeitet     |                         | 
                                                   |                         | 
 behandelte Konzepte zufriedenstellend umgesetzt   |       12 11 10 9        | 
             zum Teil mit Hilfen                   |                         | 
                                                   |                         | 
 selten vorbereitet, nur mit Hilfen weitergekommen |           8  7  6  5    | 
                                                   |                         | 
  kein Fortschritt, wiederholt dieselben Probleme  |              4 3 2 1 0  | 
                                                   |                         | 
---------------------------------------------------+-------------------------+
Anforderungsbereiche:                              |                         |
                        erreicht AB III regelmäßig | 10 9 8                  | 
                        erreicht AB  II regelmäßig |        7 6 5 4          | 
                        erreicht AB   I regelmäßig |                3 2 1 0  | 
-------------------------+----------+--------------+-------------------------+
Beurteilung:                                                                 |
-----------+----------+-----------+-----------+-----------+----------+-------+
        ab | 38 36 34 |  32 30 28 |  26 24 22 |  20 18 16 | 14 11  8 | 7 - 0 |
-----------+----------+-----------+-----------+-----------+----------+-------+
MSS Punkte | 15 14 13 |  12 11 10 |  09 08 07 |  06 05 04 | 03 02 01 |   00  |
-----------+----------+-----------+-----------+-----------+----------+-------+
```
