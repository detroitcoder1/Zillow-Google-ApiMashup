using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Auction.Models;
using ServiceStack.Text;
namespace Auction.Repository
{
    public interface IRepository
    {
        IEnumerable<CityNode> FindAll();
        void Save(CityNode citynode);
    }

    public class AddressRepository : IRepository
    {
        string addressFile = "C:\\Users\\Curt\\source\\repos\\Auction\\Auction\\Content\\CityCSV.csv";

        public IEnumerable<CityNode> FindAll()
        {
            return File.ReadAllLines(addressFile)
                                         .Skip(1)
                                         .Select(v => CityNode.FromCsv(v))
                                         .ToList();
        }

        public void Save(CityNode citynode)
        {
            var addresses = FindAll().ToList();
            if (!addresses.Exists(a => a.CityNodeId == citynode.CityNodeId))
            {
                addresses.Add(citynode);
            }

            var text = new StringBuilder();
            foreach (var a in addresses)
            {
                text.AppendLine(a.ToString());
            }

            File.WriteAllText(addressFile, text.ToString());
        }

        public void Remove(int id)
        {
            var addresses = FindAll().ToList();
            if (addresses.Exists(a => a.CityNodeId == id))
            {
                addresses.Remove(addresses.Where(a=> a.CityNodeId == id).FirstOrDefault());
            }
            string csv = CsvSerializer.SerializeToCsv(addresses);
            File.WriteAllText(addressFile, csv);
           
        }
    }
}