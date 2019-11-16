using System;

namespace mypos_api.Extensions
{
    public static class StringExtension
    {
        // "CodeMobiles".ToBath() => CodeMobiles Bath
        public static string ToBath(this String data)
        {
            // logic
            return $"{data} :::: Bath";
        }
    }
}