	var a = ['','одной ','двух ','трех ','четырех ', 'пяти ','шести ','семи ','восьми ','девяти ','десяти ','одиннадацти ','двенадцати ','тринадцати ','четырнадцати ','пятьнадцати ','шестьнадцати ','семьнадцати ','восемьнадцати ','девятьнадцати '];

	var tenthsNums = ['', '', 'двадцати','тридцати','сорока','пятидесяти', 'шестидесяти','семидесяти','восьмидесяти','девяноста'];
	var hundredsNums = ['', 'ста', 'двухсот', "трехсот", "четырехсот", "пятисот", "шестисот", "семисот", "восемисот", "девятисот"];

	var hundreds = ["сотня", "сотни", "сотен"];
	var thousands = ["тысячи", "тысячи", "тысяч"];
	var million = ["миллиона", "миллионов", "миллионов"];
	
	var fTenths = ["десятых", "десятых", "десятых"];
	var fHundreds = ["сотых", "сотых", "сотых"];
	var fThousands = ["тысячных", "тысячных", "тысячных"];

	function pluralStr(n,f){
    	n%=100;if(n>10&&n<20)return f[2];n%=10;return f[n>1&&n<5?1:n==1?0:2]
    };

    function numberToWords(num) {
    	parts = num.toString().split(".");
    	iPart = parts[0];
    	fPart = parts[1];

        var str = '';
        var flagMinus = false;
        if (iPart[0] == "-") {
            flagMinus = true;
            iPart = iPart.substr(1, iPart.length-1)
        } 
        

    	if ((iPart).length > 9) return 'более 9 нулей, много';
    	n = ('000000000' + iPart).substr(-9).match(/^(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})$/);

    	if (!n) return;

    	// Сотни миллионов
    	str += (n[1] != 0) ? (hundredsNums[Number(n[1])] || tenthsNums[n[1][0]] + ' ' + hundredsNums[n[1][1]]) + ' ': '';
    	str += (n[2] != 0) ? (a[Number(n[2])] || tenthsNums[n[2][0]] + ' ' + a[n[2][1]]) + pluralStr(n[2][1], million) + " ": '';
    	// Сотни тысяч
    	str += (n[3] != 0) ? (hundredsNums[Number(n[3])] || tenthsNums[n[3][0]] + ' ' + hundredsNums[n[3][1]]) + ' ': '';
    	str += (n[4] != 0) ? (aа[Number(n[4])] || tenthsNums[n[4][0]] + ' ' + a[n[4][1]]) + pluralStr(n[4][1], thousands) + " " : '';
    	// Сотни
    	str += (n[5] != 0) ? (hundredsNums[Number(n[5])] || tenthsNums[n[5][0]] + ' ' + hundredsNums[n[5][1]]) + ' ': '';
    	str += (n[6] != 0) ? ((str != '') ? ' ' : '') + (a[Number(n[6])] || tenthsNums[n[6][0]] + ' ' + a[n[6][1]]) + ' ' : "";
        str += (n[6] == 0 && str.trim() == "")? "нуля ": "";

        str = flagMinus? "минус " + str: str;

    	if (parts.length == 1) return str.trim();;

    	str += "целых ";

    	if ((fPart).length > 3) return 'более 3 после запятой, много';
    	n = ('000' + fPart).substr(-3).match(/^(\d{1})(\d{2})$/);

    	// Тысячных
    	str += (n[1] != 0) ? (hundredsNums[Number(n[1])] || tenthsNums[n[1][0]] + ' ' + hundredsNums[n[1][1]]) + ' ': '';
    	// Сотых
    	str += (n[2] != 0) ? ((str != '') ? ' ' : '') + (a[Number(n[2])] || tenthsNums[n[2][0]] + ' ' + a[n[2][1]]) + ' ' : '';
    	// Десятых
    	str += (parseFloat("0."+fPart).toString().length == 3)? pluralStr(fPart, fTenths): (parseFloat("0."+fPart).toString().length == 4)? pluralStr(fPart, fHundreds): pluralStr(fPart, fThousands); 

		return str.trim();;
    }