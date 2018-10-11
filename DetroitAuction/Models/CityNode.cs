using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Auction.Models
{
    [Table("CityPropertyData")]
    public class CityNode
    {
        [Key]
        public int CityNodeId { get; set; }
        public string PropertyID { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public int ZipCode { get; set; }
        public string LegalDescript { get; set; }
       
    



        public static CityNode FromCsv(string csvLine)
        {
            string[] values = csvLine.Split(',');
            CityNode CityValues = new CityNode();
            CityValues.CityNodeId = Convert.ToInt32(values[0]);
            CityValues.PropertyID = (values[1]);
            CityValues.Address = (values[2]);
            CityValues.City = (values[3]);
            CityValues.ZipCode = Convert.ToInt32(values[4]);
            CityValues.LegalDescript = (values[5]);

            return CityValues;
        }


    }

}