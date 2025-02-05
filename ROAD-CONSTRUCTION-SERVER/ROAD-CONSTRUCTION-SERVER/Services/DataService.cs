using Newtonsoft.Json;
using ROAD_CONSTRUCTION_SERVER.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ROAD_CONSTRUCTION_SERVER.Services
{
    public class DataService : IDataService
    {
        private readonly string _filePath;

        public DataService()
        {
            _filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "data.json");
            EnsureFileExists();
        }

        private void EnsureFileExists()
        {
            if (!File.Exists(_filePath))
            {
                File.WriteAllText(_filePath, "[]");
            }
        }

        public async Task<Application?> GetDataAsync()
        {
            try
            {
                if (!File.Exists(_filePath))
                {
                    return null;
                }

                string jsonString = await File.ReadAllTextAsync(_filePath);
                return JsonConvert.DeserializeObject<Application>(jsonString);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading JSON: {ex.Message}");
                return null;
            }
        }

        public async Task SaveDataAsync(Application data)
        {
            try
            {
                string jsonData = JsonConvert.SerializeObject(data, Formatting.Indented);
                await File.WriteAllTextAsync(_filePath, jsonData);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error writing JSON: {ex.Message}");
            }
        }

        public void CleanUpEmptyValues(Application data)
        {
            if (data?.Datas != null)
            {
                foreach (var dataItem in data.Datas)
                {
                    if (dataItem?.Properties != null)
                    {
                        foreach (var property in dataItem.Properties)
                        {
                            if (property.Value == null || string.IsNullOrEmpty(property.Value.ToString()))
                            {
                                property.Label = string.Empty;
                            }
                        }

                        dataItem.Properties = dataItem.Properties.Where(p => !string.IsNullOrEmpty(p.Label)).ToList();
                    }
                }
            }
        }
    }
}
