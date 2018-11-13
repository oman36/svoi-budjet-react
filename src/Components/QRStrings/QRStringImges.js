import React, {Component} from 'react';
import {QRStringsAPI} from "../../Api/v1/QRStringsAPI";

class QRStringImages extends Component {
    constructor(props) {
        super(props);
        this.deleteImg = this.deleteImg.bind(this);
        this.deleteAllImg = this.deleteAllImg.bind(this);
        this.addImageHandler = this.addImageHandler.bind(this);
        this.images = [];
    }

    componentDidMount() {
        QRStringsAPI.get_images(this.props.qr_string_id)
            .then((res) => {
                this.images = res.items;
                this.forceUpdate()
            });
    }

    deleteImg(index) {
        if (!window.confirm('Do you want to delete image?')) {
            return;
        }

        QRStringsAPI.delete_image(this.images[index].link)
            .then(() => {
                delete this.images[index];
                this.forceUpdate();
            })
    }

    deleteAllImg() {
        if (!window.confirm('Do you want to delete ALL images?')) {
            return;
        }

        QRStringsAPI.delete_images(this.props.qr_string_id)
            .then(() => {
                this.images = [];
                this.forceUpdate();
            })
    }

    addImageHandler(event) {
        QRStringsAPI.post_images(this.props.qr_string_id, event.target.files)
            .then((res) => {
                this.images = this.images.concat(res.items);
                this.forceUpdate();
            })
    }

    render() {
        return (
            <span>
                <span className="row">
                    <span className="col-6">
                        <label className="btn btn-success btn-lg">
                            Add image
                            <input
                                type="file"
                                accept="image/*"
                                className="d-none"
                                onChange={this.addImageHandler}
                                multiple
                            />
                        </label>
                    </span>
                    <span className="col-6 text-right">
                        {this.images.length > 0 ? '' :
                            <span className="btn btn-danger btn-lg" onClick={this.deleteAllImg}>
                            Delete all
                        </span>}
                    </span>
                </span>

                <div className="d-inline-flex flex-wrap">
                    {this.images.map((image, i) => (
                        <div key={i} className="qr_string_image">
                            <div className="qr_string_image__delete">
                                <div className="btn btn-danger btn-lg" onClick={() => this.deleteImg(i)}>
                                    Delete
                                </div>
                            </div>
                            <a href={image.link} target='_blank' rel="noopener noreferrer">
                                <img src={image.link} className="img-fluid" alt="check"/>
                            </a>
                        </div>
                    ))}
                </div>
            </span>
        );
    }
}

export default QRStringImages