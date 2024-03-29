using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Address
    {
        [Required]
        public string FullName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string ZipCode { get; set; }
        public string Country { get; set; }
    }
}