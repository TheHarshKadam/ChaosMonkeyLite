exports.getUsers = (req, res)=>{
    res.json({
        success:true,
        data:["Alice", "Bob", "Charlie", "Drake", "Evelyn", "Frank"]
    });
};