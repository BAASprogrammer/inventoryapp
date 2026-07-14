namespace InventoryApi.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }
        public required int Stock { get; set; }
        public string? Image { get; set; }
    }
}
