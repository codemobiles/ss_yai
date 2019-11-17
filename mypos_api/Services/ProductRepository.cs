using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using mypos_api.Database;
using mypos_api.Models;

namespace mypos_api.Services
{
    public class ProductRepository : IProductRepository
    {
        private readonly DatabaseContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ProductRepository(DatabaseContext context, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment webHostEnvironment)
        {
            this._httpContextAccessor = httpContextAccessor;
            this._webHostEnvironment = webHostEnvironment;
            this._context = context;
        }
        public async Task<Products> AddProduct(Products product)
        {
            string images = await UploadProductImages();
            if (images != null)
            {
                product.Image = images;
            }
            _context.Products.Add(product);
            _context.SaveChanges();
            return product;
        }

        public bool DeleteProduct(int id)
        {
            var result = GetProduct(id);
            if (result == null)
            {
                return false;
            }
            _context.Products.Remove(result);
            _context.SaveChanges();
            return true;
        }

        public async Task<Products> EditProduct(Products product, int id)
        {
            var result = GetProduct(id);

            if (result != null)
            {
                string images = await UploadProductImages();
                if (images != null)
                {
                    result.Image = images;
                }
                _context.Products.Update(product);
                _context.SaveChanges();
            }

            return product;
        }

        public Products GetProduct(int id)
        {
            return _context.Products.SingleOrDefault(p => p.ProductId == id);
        }

        public IEnumerable<Products> GetProducts()
        {
            return _context.Products.ToList();
        }

        // Note: recommended used async Task
        public async Task<String> UploadProductImages()
        {
            var files = _httpContextAccessor.HttpContext.Request.Form.Files;

            if (files.Count > 0)
            {
                const string folder = "/images/";
                string filePath = _webHostEnvironment.WebRootPath + folder;

                string fileName = "";
                //var fileNameArray = new List<String>(); // multiple images case

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                foreach (var formFile in files)
                {
                    fileName = Guid.NewGuid().ToString() + System.IO.Path.GetExtension(formFile.FileName); // unique name
                    string fullPath = filePath + fileName;

                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            await formFile.CopyToAsync(stream);
                        }
                    }

                    // fileNameArray.Add(fileName); // multiple images case
                }

                return fileName;
                //return fileNameArray; // multiple images case
            }
            return String.Empty;
            //return null;      // multiple images case
        }


    }
}







//case order by
//return View(await context.Products.OrderBy(o => o.Price).ToListAsync());
//return View(await (from p in context.Products orderby p.Price descending select p).ToListAsync());
//return View(context.Products.FromSql("select * from Products order by Price ASC"));

/*
        public async Task<IActionResult> Query()
        {
            //exam 1
            IEnumerable<Product> exam1 = context.Products.FromSql("select * from Products where id = 1");
            List<Product> exam2 = new List<Product>();
            List<Product> exam3 = new List<Product>();
            List<Product> exam4 = new List<Product>();

            var conn = context.Database.GetDbConnection();
            DbDataReader reader;
            string query;

            try
            {
                await conn.OpenAsync();
                using (var command = conn.CreateCommand())
                {
                    //exam 2
                    query = "select * from Products";
                    command.CommandText = query;
                    reader = await command.ExecuteReaderAsync();

                    if (reader.HasRows)
                    {
                        while (await reader.ReadAsync())
                        {
                            var row = new Product
                            {
                                ID = reader.GetInt32(0),
                                CodeName = reader.GetString(2),
                                Name = reader.GetString(9),
                                Detail = reader.GetString(3),
                                Price = reader.GetDecimal(10),
                                CategoryID = reader.GetInt32(1),
                                Image1 = reader.GetString(4),
                                Image2 = reader.GetString(5),
                                Image3 = reader.GetString(6),
                                Image4 = reader.GetString(7),
                                Image5 = reader.GetString(8),
                                Timestamp = reader.GetDateTime(11)
                            };
                            exam2.Add(row);
                        }
                    }

                    reader.Close();

                    //exam 3
                    int nCatID = 2;
                    exam3 = context.Products.FromSql("myStoredProcedure @p0", nCatID).ToList();

                    //exam 4
                    query = "myStoredProcedure";
                    command.CommandText = query;
                    command.CommandType = CommandType.StoredProcedure;
                    reader = await command.ExecuteReaderAsync();

                    if (reader.HasRows)
                    {
                         while (await reader.ReadAsync())
                        {
                            var row = new Product
                            {
                                ID = reader.GetInt32(0),
                                CodeName = reader.GetString(2),
                                Name = reader.GetString(9),
                                Detail = reader.GetString(3),
                                Price = reader.GetDecimal(10),
                                CategoryID = reader.GetInt32(1),
                                Image1 = reader.GetString(4),
                                Image2 = reader.GetString(5),
                                Image3 = reader.GetString(6),
                                Image4 = reader.GetString(7),
                                Image5 = reader.GetString(8),
                                Timestamp = reader.GetDateTime(11)
                            };

                            exam4.Add(row);
                        }
                    }

                    reader.Close();
                }
            }
            catch
            {

            }finally{
                conn.Close();
            }

            return View();
        }

        //exam 5
        using (var command = context.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = "StoredProcedureName";
            command.CommandType = CommandType.StoredProcedure;

            context.Database.OpenConnection();

            var dataReader = command.ExecuteReader();

            if (dataReader.Read())
            {
                string _test = dataReader.GetString(dataReader.GetOrdinal("ColumnName"));
            }
        }

        //exam 6
        await Context.Database.ExecuteSqlCommandAsync("myStoredProcedure @p0, @p1", 
        parameters: new[] { "codemobiles", "cmdev" });
 */
