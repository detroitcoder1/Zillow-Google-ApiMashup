using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static Auction.Models.ZillowModel;
using Auction.Controllers;
using Auction.Repository;

namespace Auction.Controllers
{
    public class HomeController : Controller
    {

        private AddressRepository r = new AddressRepository();


        public ActionResult Index()
        {

            var count = r.FindAll().Count();
            ViewBag.Count = count.ToString();
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult CityProperty()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}