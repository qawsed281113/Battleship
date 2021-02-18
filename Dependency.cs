using System;
namespace Exam 
{
    public class A 
    {
        public string name { get; set; }
        public void SayHello () 
        {
            Console.WriteLine(this.name);
        }
    }
    public class B
    {
        private readonly A _a;
        public B()
        {
        }
    }
}