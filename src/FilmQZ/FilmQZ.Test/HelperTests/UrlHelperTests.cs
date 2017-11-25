using FilmQZ.App.BusinessLogic.Helpers;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.Test.HelperTests
{
    [TestFixture]
    public class UrlHelperTests
    {
        private URLHelpers UrlHelper;

        [SetUp]
        protected void Setup()
        {
            this.UrlHelper = new URLHelpers();
        }

        [Test]
        [TestCase("test game 2018", "test-game-2018")]
        [TestCase("test game - 2018", "test-game-2018")]
        [TestCase("test-game", "test-game")]
        [TestCase("test-g3me", "test-g3me")]
        [TestCase("1234", "1234")]
        [TestCase("12 34", "12-34")]
        [TestCase("-test-", "-test-")]
        [TestCase(" test ", "-test-")]
        [TestCase("-3-", "-3-")]
        [TestCase("quiz 2.0", "quiz-2-0")]
        public void ValidGameNames(string gameName, string url)
        {
            var generatedUrl = UrlHelper.GenerateCleanURL(gameName);
            Assert.AreEqual(url, generatedUrl);
        }

        [TestCase("-")]
        [TestCase(" ")]
        [TestCase("--")]
        [TestCase("---")]
        [TestCase("  ")]
        [TestCase("   ")]
        [TestCase("test!")]
        [TestCase("test?")]
        [TestCase("-!-")]
        [TestCase("- ")]
        [TestCase(" -")]
        [TestCase("!")]
        [TestCase("/")]
        [TestCase("#")]
        [TestCase(".")]
        [TestCase(" . ")]
        [TestCase("..")]
        [TestCase("...")]
        [TestCase("=")]
        [TestCase("test#sers")]
        [TestCase("test?tset")]
        [TestCase("test?test=set")]
        public void InValidGameNames(string gameName)
        {
            Assert.Throws<ArgumentException>(()=>UrlHelper.GenerateCleanURL(gameName),$"Game name,{gameName}, did not fail as expected");
        }
    }
}
