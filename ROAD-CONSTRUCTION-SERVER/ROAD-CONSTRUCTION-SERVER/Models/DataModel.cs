using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace ROAD_CONSTRUCTION_SERVER.Models
{
    public class Properties
    {
        [JsonProperty("Value")]
        public object Value { get; set; }  // ✅ कोणत्याही प्रकारचा डेटा स्वीकारेल (string, int, float, bool)

        [JsonProperty("Label")]
        public string Label { get; set; }
    }

    public class Datas
    {
        [JsonProperty("SamplingTime")]
        public DateTime SamplingTime { get; set; }

        [JsonProperty("Properties")]
        public List<Properties> Properties { get; set; } = new();
    }

    public class Application
    {
        [JsonProperty("Id")]
        public int Id { get; set; }

        [JsonProperty("Name")]
        public string Name { get; set; }

        [JsonProperty("Datas")]
        public List<Datas> Datas { get; set; } = new();
    }
    public class ValueValue
    {
        public string ValueKind { get; set; }
        public object ActualValue { get; set; }
    }
}
