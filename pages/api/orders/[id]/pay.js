import Order from "@/components/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send("Signin required");
  }
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    if (order.isPaid) {
      return res.status(400).send({ message: "Error: order is already paid" });
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };

    const paidOrder = await order.save();
    await db.disconnect();
    res.send({
      message: "Order paid successfully",
      order: paidOrder,
    });
  } else {
    await db.disconnect();
    res.status(404).send({
      message: "Error: order not found",
    });
  }
};

export default handler;
