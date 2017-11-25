using FilmQZ.Core.Entities;
using FilmQZ.Core.Entities.Relations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.Core.Extensions
{
    public static class UserReferences
    {
        public static UserGame AddUser( this Game game, string userId)
        {
            var user = game.Users.SingleOrDefault(u => u.UserId == userId);
            if (user == null)
            {
                user = new UserGame()
                {
                    UserId = userId
                };
                game.Users.Add(user);
            }

            return user;
        }

        public static UserTeam AddUser(this Team team,string userId)
        {
            var user = team.Users.SingleOrDefault(u => u.UserId == userId);
            if (user == null)
            {
                user = new UserTeam()
                {
                    UserId = userId
                };
                team.Users.Add(user);
            }

            return user;
        }
    }
}
