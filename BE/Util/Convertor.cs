namespace BE.Util
{
    public class Convertor
    {
        string[] units = { "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" };
        string[] teens = { "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen" };
        string[] tens = { "", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety" };
        string millions = "million";
        string thousands = "thousand";
        string hundreds = "hundred";
        string[] dollars = { "dollars", "dollar" };
        string[] cents = { "cents", "cent" };

        public string NumberToPhrase(double number)
        {
            if (number == 0)
                return units[0];

            string phrase = "";
            int _integer = (int)Math.Floor(number);
            int _decimals = (int)Math.Round((number - _integer) * 100);

            if (_integer < 0)
                phrase += "minus ";

            phrase += $"{ConvertToPhrase(_integer)} {(_integer > 1 ? dollars[0] : dollars[1])}";

            if (_decimals > 0)
                phrase += $" and {lastNumbers(_decimals)} {(_decimals > 1 ? cents[0] : cents[1])}";

            return phrase;
        }

        public string ConvertToPhrase(int _integer)
        {
            string phrase = "";
            string numberInText = _integer.ToString();
            int comodin = 0;

            if (_integer > 1000000)
            {
                if (numberInText.Length == 9)
                {
                    phrase += $"{lastNumbers(int.Parse(numberInText.Substring(0, 1)))} {hundreds}";
                    _integer = recalculateNumber(_integer, numberInText.Substring(0, 1), 8);
                    numberInText = _integer.ToString();
                }

                comodin = numberInText.Length > 7 ? 2 : 1;
                phrase += $" {lastNumbers(int.Parse(numberInText.Substring(0, comodin)))} {millions} ";
                _integer = recalculateNumber(_integer, numberInText.Substring(0, comodin), 6);
                numberInText = _integer.ToString();
            }

            if (_integer > 1000)
            {
                if (numberInText.Length == 6)
                {
                    phrase += $"{lastNumbers(int.Parse(numberInText.Substring(0, 1)))} {hundreds}";
                    _integer = recalculateNumber(_integer, numberInText.Substring(0, 1), 5);
                    numberInText = _integer.ToString();
                }

                comodin = numberInText.Length > 4 ? 2 : 1;
                phrase += $" {lastNumbers(int.Parse(numberInText.Substring(0, comodin)))} {thousands} ";
                _integer = recalculateNumber(_integer, numberInText.Substring(0, comodin), 3);
                numberInText = _integer.ToString();
            }

            if (numberInText.Length == 3)
            {
                phrase += $"{lastNumbers(int.Parse(numberInText.Substring(0, 1)))} {hundreds}";
                _integer = recalculateNumber(_integer, numberInText.Substring(0, 1), 2);
                numberInText = _integer.ToString();
            }

            comodin = numberInText.Length > 1 ? 2 : 1;
            phrase += $" {lastNumbers(int.Parse(numberInText.Substring(0, comodin)))}";

            return phrase.Trim();
        }

        public int recalculateNumber(int actualValue, string numbers, int toConcat)
        {
            string ceros = "";
            for (int i = 0; i < toConcat; i++)
                ceros += "0";
            return actualValue - int.Parse(numbers + ceros);
        }

        public string lastNumbers(int _integer)
        {
            if (_integer < 10)
                return units[_integer];
            else if (_integer < 20)
                return teens[_integer - 11];
            else
            {
                string phrase = "";
                phrase += tens[_integer / 10];

                // cool way to use mod, new ideas unlocks
                if ((_integer % 10) > 0)
                    phrase += "-" + units[_integer % 10];
                return phrase;
            }
        }
    }
}
